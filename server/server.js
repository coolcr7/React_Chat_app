


const io = require('socket.io')(5000, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
  });


io.on('connection', socket => {
    const id = socket.handshake.query.id
    console.log("connection made",{id})
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    console.log("sending message",recipients,text)
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      console.log(newRecipients,id,text)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})