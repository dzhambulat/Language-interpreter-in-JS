/**
 * Created by Dzhambulat on 05.08.2015.
 */
describe('interpreter',function(){
    it('the "a" id must be equaled to 7 in global table',function(){
        var interp=new Interpreter();
        var vipl=new ViplCore();

        var st=vipl.interpret(' a = 5+2');
        interp.interpret(st);

        expect(interp.globalTable['a'].value).toBe(7);
    })
})