/**
 * Created by Dzhambulat on 17.02.2015.
 */

function ViplCore(){

    this.lexer=new Lexer();
    this.parser=new Parser();

}

ViplCore.prototype.getTokens=function(text)
{
    var tokens=[];
    this.tokenIndex=0;
    var v=this.lexer.scanStrings(text);
    text= v.text;

    delete v.text;
    tokens.push.apply(tokens,v);

    v=this.lexer.scanOperators(text);
    text= v.text;

    delete v.text;
    tokens.push.apply(tokens,v);

    v=this.lexer.scanIdentificators(text);
    text= v.text;

    delete v.text;
    tokens.push.apply(tokens,v);

    tokens.sort(function(a,b)
    {
        return a.index- b.index;
    });
    this.tokens=tokens;

    return tokens;
}

ViplCore.prototype.shift=function()
{
    var token=this.tokens[this.tokenIndex];
    this.tokenIndex+=1;

    return token;
}
ViplCore.prototype.reduceProduct=function(state,token)
{
    var isReduce=false;
    var isShift=false;

    for(var i in state)
    {
        var product=state[i];
        var p=product.products.split(' ');
        if (p[product.pointIndex]===token.type)
        {
            isShift=true;
            break;
        }
        else if (product.pointIndex=== p.length)
        {
            isReduce=true;
            var productToReduce=product;
        }
    }
    if (!isShift && isReduce)
    {
        return productToReduce;
    }
    else
    {
        return null;
    }
}
ViplCore.prototype.interpret=function(text)
{
    this.getTokens(text);
    var genStack=[];
    var states=[];

    states.push([
        {
            pointIndex: 0,
            products: 'S',
            symbol: 'SA'
        }]
    );
    states[0]=this.parser.closure(states[0]); //states of LR parser
    var currentState=0; //current state
    var endParse=false;
    var token=this.shift();
    while (!endParse)
    {
        var newState=this.parser.closure(states[currentState],currentState);

        if(newState!=null)
        {
            states.push(newState);
            currentState+=1;
            continue;
        }
        else
        {
            var cstate=states[currentState];
            var productToReduce=this.reduceProduct(cstate,token)

            if (!productToReduce)
            {
                genStack.push(token);
                newState=this.parser.goto(states[currentState],token.type);
                states.push(newState);
                currentState+=1;
            }
            else
            {
                if (productToReduce.symbol==='SA')
                {
                    endParse=true;
                }
                var reducedProduct=this.parser.reduce(productToReduce,genStack);
                genStack.push(reducedProduct);
                newState=this.parser.goto(cstate,productToReduce.symbol);
                currentState+=1;
                states.push(newState);
            }
        }
    }

}