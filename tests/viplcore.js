/**
 * Created by Dzhambulat on 17.02.2015.
 */
describe('viplcore',function(){

    it('getTokens',function(){

        var vipl=new ViplCore();

        var tokens=vipl.getTokens('= "t+est1" id1  name  + "string"');

        expect(tokens[0]).toEqual(

                {
                    type:'assigment',
                    value:'=',
                    index:0
                }

        );
        expect(tokens[1]).toEqual(

                {
                    type:'string',
                    value:'t+est1',
                    index:2
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
                    type:'lpoperator',
                    value:'+',
                    index:22
                }

        );
        expect(tokens[5]).toEqual(

                {
                    type:'string',
                    value:'string',
                    index:24
                }

        );

    });
});

describe('viplcore',function(){

  /*  it('interpret',function(){

        var vipl=new ViplCore();
        vipl.interpret("1+3+7");
    });*/
    var vipl=new ViplCore();

    it('reduceProduct',function(){
       expect(vipl.reduceProduct(
            [{
                products:'E T add',
                pointIndex:3,
                symbol:'S'
            },
            {
                products:'E add G',
                pointIndex:1,
                symbol:'C'
            }],
           {
               type:'lpoperator'
           }
       )).toEqual(
           {
               products:'E T add',
               pointIndex:3,
               symbol:'S'
           }
       );
    });


    it('reduceProduct not reduce',function()
    {
        expect(vipl.reduceProduct(
            [{
                products:'E T lpoperator',
                pointIndex:2,
                symbol:'S'
            },
                {
                    products:'E add G',
                    pointIndex:3,
                    symbol:'C'
                }],
            {
                type:'lpoperator'
            }
        )).toBe(null);

        expect(vipl.reduceProduct(
            [{
                products:'E T lpoperator',
                pointIndex:1,
                symbol:'S'
            },
                {
                    products:'E add G',
                    pointIndex:3,
                    symbol:'C'
                }],
            {
                type:'lpoperator'
            }
        )).toEqual(   {
            products:'E add G',
            pointIndex:3,
            symbol:'C'
        });
    });

    it('interpret',function()
    {
        vipl.interpret("2+3");
    });


});