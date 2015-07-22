/**
 * Created by Dzhambulat on 01.02.2015.
 */

function Lexer()
{

}

Lexer.prototype.maskString=function(text,re,symbol,len)
{
    var mask='';

    for(var i=0;i<len;i++)
    {
        mask+=symbol;
    }

    return text.replace(re,mask);
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

        text=this.maskString(text,rgRes[0],'\x7F',re.lastIndex-rgRes.index);
    }
    stringTokens.text=text;
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

        text=this.maskString(text,rgRes[0],'\x7F',re.lastIndex-rgRes.index);
    }

    idTokens.text=text;
    return idTokens;
}

Lexer.prototype.scanNumbers=function(text)
{
    var re=/(\d+?)/ig;
    var rgRes=null;
    var numTokens=[];

    while ((rgRes=re.exec(text))!=null)
    {
        var numToken={
            type:'number'
        };
        numToken.value=rgRes[1];
        numToken.index=rgRes.index;

        numTokens.push(numToken);
        text=this.maskString(text,rgRes[0],'\x7F',re.lastIndex-rgRes.index);
    }

    numTokens.text=text;

    return numTokens;
}

Lexer.prototype.scanTokens=function(text,re,type)
{
    var tokens=[];
    var rgRes=null;

    while ((rgRes=re.exec(text))!=null)
    {
        var token= {
            type: type,
            value: rgRes[1],
            index: rgRes.index
        }
        tokens.push(token);
        text=this.maskString(text,rgRes[0],'\x7F',re.lastIndex-rgRes.index);
    }

    tokens.text=text;
    return tokens;
}

Lexer.prototype.scanLpAriphmeticOperators=function(text)
{
   var re=/(\+|-)/g;
   return this.scanTokens(text,re,'lpoperator');
}

Lexer.prototype.scanHpAriphmeticOperators=function(text)
{
    var re=/(\*|\/)/g;
    return this.scanTokens(text,re,'hpoperator');
}

Lexer.prototype.scanAssigmentOperators=function(text)
{
    var re=/(=)/g;
    return this.scanTokens(text,re,'assigment');
}