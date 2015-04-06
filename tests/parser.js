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
    it('closure',function(){
        var parser=new Parser();

        expect(parser.closure([
            {pointIndex:0,
                products:'T lpoperator E',
                symbol:'E',
                stateIndex:1
            },

            {pointIndex:0,
                products:'T',
                symbol:'E',
                stateIndex:1}
        ],2)).toEqual(
            [
                {pointIndex:0,
                    products:'T lpoperator E',
                    symbol:'E',
                    stateIndex:1
                },
                {pointIndex:0,
                    products:'T',
                    symbol:'E',
                    stateIndex:1},
                {pointIndex:0,
                    products:'( E )',
                    symbol:'T',
                    stateIndex:2},
                {pointIndex:0,
                    products:'T hpoperator E',
                    symbol:'T',
                    stateIndex:2},
                {
                    pointIndex:0,
                    products:'number',
                    symbol:'T',
                    stateIndex:2
                }
            ]
        );

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
                    symbol:'E'}
            ]
        );


    });
});

describe('parser',function(){
    it('reduce',function(){
        var parser=new Parser();

        expect(parser.reduce(
            {pointIndex:1,
                products:'T lpoperator E',
                symbol:'E',
                stateIndex:1
            }

        ,[{
            isToken:true,
            value:{
                type:'lpoperator',
                value:'+'
            }
        }])).toEqual(
            {
                isToken:false,
                value:[{
                    isToken:true,
                    value:{
                          type:'lpoperator',
                          value:'a'
                    }
                }]
            }
        );

    }); ;
});

