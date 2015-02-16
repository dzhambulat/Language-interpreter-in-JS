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

    tokens.push.apply(tokens,this.lexer.scanStrings(text));
    tokens.push.apply(tokens,this.lexer.scanOperators(text));
    tokens.push.apply(tokens,this.lexer.scanIdentificators(text));

    tokens.sort(function(a,b)
    {
        return a.index- b.index;
    });

    return tokens;
}

ViplCore.prototype.interpret=function(text)
{

}