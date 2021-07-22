import { Router, Request, Response } from "express";
import multer from "multer";
import { amqpConnect } from "config";
import Post from "models/Post";
import { StringifyOptions } from "querystring";


const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void) {
    const dir = './notes';
    callback(null, dir);
  },
  filename: function (req: Request, file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void) {
    callback(null, 'notes-'+ new Date().getTime() + file.originalname);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File,
  callback: (error: Error | null, destination: boolean) => void) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const router = Router();

let channel;
amqpConnect({ url: process.env.CLOUDAMQP_URL })
  .then(ch => {
    channel = ch;

    channel.assertQueue('note_created', { durable: false })
    channel.assertQueue('note_deleted', { durable: false })
    
    channel.consume('note_created', async (message) => {
      const eventPost = JSON.parse(message.content.toString());
      console.log(eventPost);
      
      upload.fields([eventPost.filePath]);
      
      // const postRepository = getRepository(Post);
      const postData: {
        originId: StringifyOptions;
        ownerUserName: string;
        title: string;
        subTitle: string;
        noteImage: string;
        tags: string;
        content: string;
      } = {
        originId: eventPost.result._id,
        ownerUserName: eventPost.result.owner.userName,
        title: eventPost.result.title,
        subTitle: eventPost.result.subTitle,
        noteImage: eventPost.filePath.path,
        tags: eventPost.result.tags,
        content: eventPost.result.content,
      }
      const post = new Post(postData);
      await post.save();
    }, { noAck: true })
    
    channel.consume('note_deleted', async (message) => {
      const eventPost = JSON.parse(message.content.toString());
      console.log(eventPost);
      const post = await Post.findOne({ originId: eventPost });
      post.delete();
      console.log("post deleted");
    }, { noAck: true });
  });


/**
 * @route GET/auth
 * @desc create user
 * @access authenticated 
 */

router.get('/', async (req: Request, res: Response) => {
  Post.find()
    .exec()
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
})

export default router;
