/**
 * Created by Dzhambulat on 06.02.2015.
 */

describe('parser',function(){
    it('first',function(){
        var parser=new Parser();

        var terms=parser.first('S');

        expect(terms.length).toBe(2);

    }) ;
});