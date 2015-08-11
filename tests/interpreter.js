/**
 * Created by Dzhambulat on 05.08.2015.
 */
describe('interpreter',function(){
    it('test interpret with id=5',function(){
        var interp=new Interpreter();
        var vipl=new ViplCore();

        var st=vipl.interpret(' a = 5');
        interp.interpret(st);

        expect(interp.globalTable['a'].value).toBe(5);
    })
})