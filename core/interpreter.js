/**
 * Created by Dzhambulat on 23.07.2015.
 */

function Interpreter(){

}

Interpreter.prototype.interpret=function(syntaxTree)
{
    if(syntaxTree.isToken)
    {
        return syntaxTree.value;
    }
    var symbol=syntaxTree.symbol;

    switch (symbol)
    {
        case 'ST':

            break;
    }
}

