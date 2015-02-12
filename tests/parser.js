/**
 * Created by Dzhambulat on 06.02.2015.
 */

describe('parser',function(){
    it('first',function(){
        var parser=new Parser();

        var terms=parser.first('S');

        expect(terms.length).toBe(3);

    }) ;
});

describe('parser',function(){
    it('isInQueue',function(){
        var parser=new Parser();

        expect(parser.isInQueue([
            {pointIndex:4,
            products:parser.CFG['S'][0]},
            {pointIndex:0,
                products:parser.CFG['S'][0]},
            {pointIndex:3,
                products:parser.CFG['VL'][0]}
        ], {pointIndex:0,
            products:parser.CFG['S'][0]})).toBe(true);

    }); ;
});


describe('parser',function(){
    it('closure',function(){
        var parser=new Parser();

        expect(parser.closure([
            {pointIndex:0,
                products:parser.CFG['S'][0],
                symbol:'S'
            },

            {pointIndex:0,
                products:parser.CFG['C'][0],
                symbol:'C'}
        ])).toEqual(
            [
                {pointIndex:0,
                    products:parser.CFG['S'][0],
                    symbol:'S'},
                {pointIndex:0,
                    products:parser.CFG['C'][0],
                    symbol:'C'},
                {pointIndex:0,
                    products:parser.CFG['V'][0],
                    symbol:'V'},
                {pointIndex:0,
                    products:parser.CFG['I'][0],
                    symbol:'I'}
            ]
        );

    }); ;
});
describe('parser',function(){
    it('goto',function(){
        var parser=new Parser();

        expect(parser.goto([
            {pointIndex:0,
                products:parser.CFG['S'][0],
                symbol:'S'},
            {pointIndex:0,
                products:parser.CFG['C'][0],
                symbol:'C'},
            {pointIndex:0,
                products:parser.CFG['V'][0],
                symbol:'V'},
            {pointIndex:0,
                products:parser.CFG['I'][0],
                symbol:'I'}
        ],'id')).toEqual(
            [
                {pointIndex:1,
                    products:parser.CFG['I'][0],
                    symbol:'I'}
            ]
        );

        expect(parser.goto([
            {pointIndex:0,
                products:parser.CFG['C'][1],
                symbol:'C'},
            {pointIndex:0,
                products:parser.CFG['VL'][0],
                symbol:'VL'}
        ],'I')).toEqual(
            [
                {pointIndex:1,
                    products:parser.CFG['C'][1],
                    symbol:'C'},
                {pointIndex:1,
                    products:parser.CFG['VL'][0],
                    symbol:'VL'}
            ]
        );

    }); ;
});

describe('parser',function(){
    it('reduce',function(){
        var parser=new Parser();

        expect(parser.reduce(
            {pointIndex:0,
                products:parser.CFG['VL'][0],
                symbol:'VL'}

        ,[{
            isToken:true,
            value:{
                type:'id',
                value:'a'
            }
        }])).toEqual(
            {
                isToken:false,
                value:[{
                    isToken:true,
                    value:{
                          type:'id',
                          value:'a'
                    }
                }]
            }
        );

    }); ;
});

