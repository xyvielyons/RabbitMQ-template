import amqp from 'amqplib'
import { rabbitMQ } from './config.js';
//step1 : connect to rabbitmq server
//step2 : create a new channel on that connection
//step3 :create the exchange
//step4: publish the message to the exchange with a routing key
class Producer {
    channel;
    async createChannel (){
       const connection = await amqp.connect(rabbitMQ)
       this.channel = await connection.createChannel()
    }
    async publishMessage(routingKey,message){
        if(!this.channel){
           await this.createChannel()
        }
        //the name of the exachange and type
        //we pass in the type of the exchange we are using 'direct'
        await this.channel.assertExchange(rabbitMQ.exchangeName,'direct')
        
        const logDetails = {
            logType:routingKey,
            message:message,
            dateTime:new Date()
        }

        await this.channel.publish(rabbitMQ.exchangeName,routingKey,Buffer.from(JSON.stringify(logDetails)))
        
        console.log(`the message ${message} is sent to exchange ${rabbitMQ.exchangeName}`)
    }
}
export const Producerr =  Producer