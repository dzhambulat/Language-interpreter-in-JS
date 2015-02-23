/**
 * Created by Dzhambulat on 17.02.2015.
 */
describe('viplcore',function(){
    it('getTokens',function(){
        var vipl=new ViplCore();
        var tokens=vipl.getTokens('== "t+est1" id1  name  + "string"');
        expect(tokens[0]).toEqual(

                {
                    type:'operator',
                    value:'==',
                    index:0
                }

        );
        expect(tokens[1]).toEqual(

                {
                    type:'string',
                    value:'t+est1',
                    index:3
                }

        );
        expect(tokens[2]).toEqual(

                {
                    type:'id',
                    value:'id1',
                    index:11
                }

        );
        expect(tokens[3]).toEqual(

                {
                    type:'id',
                    value:'name',
                    index:16
                }

        );
        expect(tokens[4]).toEqual(

                {
                    type:'operator',
                    value:'+',
                    index:23
                }

        );
        expect(tokens[5]).toEqual(

                {
                    type:'string',
                    value:'string',
                    index:25
                }

        );

    });
});
