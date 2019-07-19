if (process['send']) {
    console.log('Child(1) Process Started!');
}

process.on('message', function(packet) {
    if(packet.data.target === 'child-1') {
        console.log('Child(1) Received:\n', packet.data);
    }
});

/*
process.send({
    type: 'process:msg',
    data: {
        target : 'child-2',
        text : 'send message template'
    },
    topic: 'my topic'
});
*/
