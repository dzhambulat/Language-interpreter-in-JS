/**
 * Created by Dzhambulat on 06.02.2015.
 */


describe('parser',function(){
    it('isInQueue',function(){
        var parser=new Parser();

        expect(parser.isInQueue([
            {pointIndex:1,
            products:'E T add'},
            {pointIndex:0,
                products:'D F A'}
        ], {pointIndex:1,
            products:'E T add'})).toBe(true);

    }); ;
});


describe('parser',function(){
    it('goto',function(){
        var parser=new Parser();

        expect(parser.goto([
            {pointIndex:1,
                products:'T lpoperator E',
                symbol:'E',
                stateIndex:1
            },

            {pointIndex:0,
                products:'T',
                symbol:'E',
                stateIndex:1}
        ],'lpoperator')).toEqual(
            [
                {pointIndex:2,
                    products:'T lpoperator E',
                    symbol:'E',stateIndex:1}
            ]
        );


    });
});

describe('parser',function(){
    it('reduce',function(){
        var parser=new Parser();

        expect(parser.reduce(
            {pointIndex:1,
                products:'number',
                symbol:'T',
                stateIndex:1
            }

        ,[{
            isToken:true,
            value:{
                type:'number',
                value:'9'
            }
        }])).toEqual(
            {
                isToken:false,
                symbol:'T',
                value:[{
                    isToken:true,
                    value:{
                          type:'number',
                          value:'9'
                    }
                }]
            }
        );

    }); ;
});

