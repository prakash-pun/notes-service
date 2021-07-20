import { Router, Request, Response } from "express";
import { amqpConnect } from "config";
import { Post } from "entity/Post";
import { getRepository } from "typeorm";

const router = Router();

let channel;
amqpConnect({ url: process.env.CLOUDAMQP_URL })
  .then(ch => {
    channel = ch;

    channel.assertQueue('note_created', { durable: false })
    
    channel.consume('note_created', async (message) => {
      const eventPost = JSON.parse(message.content.toString());
      console.log(eventPost.id);
      
      const postRepository = getRepository(Post);
      const postData: {
        originId: number;
        ownerUserName: string;
        title: string;
        subTitle: string;
        noteImage: string;
        tags: string;
        content: string;
      } = {
        originId: parseInt(eventPost.id),
        ownerUserName: eventPost.owner.userName,
        title: eventPost.title,
        subTitle: eventPost.subTitle,
        noteImage: eventPost.noteImage,
        tags: eventPost.tags,
        content: eventPost.content,
      }
      
      await postRepository.save(postData);
    }, {noAck:true})
  });


/**
 * @route GET/auth
 * @desc create user
 * @access authenticated 
 */


router.get('/', async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  const result = await postRepository.find();
  res.status(200).json(result);
})

export default router;
