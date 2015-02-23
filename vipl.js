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

    return tokens;
}

ViplCore.prototype.interpret=function(text)
{
    var tokens=this.getTokens(text);
    var genStack=[];
    var states=[];

    states.push([
        {
            pointIndex: 0,
            products: 'S',
            symbol: 'SA'
        }]
    );
    states[0]=this.parser.closure(states[0]);
    var currentState=0;
    for(var i in tokens)
    {
        var token=tokens[i];
        genStack.push(token);
        states[currentState+1]=this.parser.goto(states[currentState],token.type);

    }

}