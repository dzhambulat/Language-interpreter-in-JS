/**
 * Created by Dzhambulat on 02.02.2015.
 */

describe('scanner',function(){
   it('strings',function(){
       var lexer=new Lexer();
       var text='"string1" some other words "string2"';
       var res=lexer.scanStrings(text);

       expect(res.length).toBe(2);
       expect(res[0].value).toBe('string1');
       expect(res[0].index).toBe(0);
       expect(res[1].value).toBe('string2');
       expect(res[1].index).toBe(text.indexOf('"string2"'));

   }) ;
});

describe('scanner',function(){
    it('identificators',function(){
        var lexer=new Lexer();
        var text='1dfsf id1 _id .dfdff';
        var res=lexer.scanIdentificators(text);

        expect(res.length).toBe(2);
        expect(res[0].value).toBe('id1');
        expect(res[0].index).toBe(text.indexOf('id1'));
        expect(res[1].value).toBe('_id');
        expect(res[1].index).toBe(text.indexOf('_id"'));

    }) ;
});

describe('scanner',function(){
    it('operators',function(){
        var lexer=new Lexer();
        var text='1 = 2-1*4';

        var res=lexer.scanOperators(text);

        expect(res.length).toBe(3);
        expect(res[0].value).toBe('=');
        expect(res[0].index).toBe(text.indexOf('='));
        expect(res[1].value).toBe('-');
        expect(res[1].index).toBe(text.indexOf('-'));
        expect(res[2].value).toBe('*');
        expect(res[2].index).toBe(text.indexOf('*'));

    }) ;
});

describe('scanner',function(){

    it('lp and hp ariphmetic operators',function(){
        var lexer=new Lexer();
        var text='1=1+2-1*4';

        var res=lexer.scanLpAriphmeticOperators(text);

        expect(res.length).toBe(2);
        expect(res[0].value).toBe('+');
        expect(res[0].index).toBe(3);
        expect(res[1].value).toBe('-');
        expect(res[1].index).toBe(5);

        res=lexer.scanHpAriphmeticOperators(res.text);

        expect(res.length).toBe(1);
        expect(res[0].value).toBe('*');
        expect(res[0].index).toBe(7);


    }) ;
});