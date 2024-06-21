//1. connect to the rabbitmq server
//2.create a new channel
//3.create the exchange
//4.create the queue
//5.bind the queue to the exchange
//6.consume messages from the queue

import amqp from 'amqplib'

async function consumeMessages(){
    //1. connect to the rabbitmq server
    const connection = await amqp.connect("amqp://localhost")
    //2.create a new channel
    const channel = await connection.createChannel()
    //3.create the exchange by parsing in the name of the exchange and exchange type

    await channel.assertExchange("logExchange","direct")

    //4.create the queue using assetQueue parsing in the name of the queue
    const q = await channel.assertQueue("InfoQueue");
    
    //5.we bind the queue to the exchange using the bindQueue
    //we parse in the the name of the queue,the name of exchange and the name of the bind
    await channel.bindQueue(q.queue,"logExchange","Info")

    //we consume the messages from the queue
    channel.consume(q.queue,(msg)=>{
        //we convert the data to a JSON object
        const data = JSON.parse(msg.content)
        //we print the data
        console.log(data)
        //we print an acknowledgement to the rabbit MQ that we got the message so as to delete the message from the queue
        channel.ack(msg)
    })

}
consumeMessages()