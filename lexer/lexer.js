/**
 * Created by Dzhambulat on 01.02.2015.
 */

function Lexer()
{

}

Lexer.prototype.scanStrings=function (text)
{
    var re=/"([\w\W]*?)"/ig;
    var rgRes=null;
    var stringTokens=[];

    while ((rgRes=re.exec(text))!=null)
    {
        var stringToken={
            type:'string'
        };

        stringToken.value=rgRes[1];
        stringToken.index=rgRes.index;

        stringTokens.push(stringToken);
    }

    return stringTokens;
}

Lexer.prototype.scanIdentificators=function(text)
{
    var re=/\s([a-z_][\w]*)\s/ig;
    var rgRes=null;
    var idTokens=[];

    while ((rgRes=re.exec(text))!=null)
    {
        var idToken={
            type:'id'
        };
        idToken.value=rgRes[1];
        idToken.index=rgRes.index;

        idTokens.push(idToken);
    }

    return idTokens;
}

Lexer.prototype.scanOperators=function(text)
{
    var re=/((==|=|\+|-|\*|\/))/ig;
    var rgRes=null;
    var opTokens=[];

    while ((rgRes=re.exec(text))!=null)
    {
        var opToken={
            type:'operator'
        };
        opToken.value=rgRes[1];
        opToken.index=rgRes.index;

        opTokens.push(opToken);
    }

    return opTokens;
}