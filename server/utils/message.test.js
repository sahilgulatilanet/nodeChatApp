var expect=require('expect');

var {genrateMessage}=require('./message');

describe('genrateMessage',()=>{
    it('should genrate correct message Object',()=>{
        var from='sahil';
        var text='hello ssup?';
        var message=genrateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});