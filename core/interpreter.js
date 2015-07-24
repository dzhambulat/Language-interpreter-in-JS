/**
 * Created by Dzhambulat on 23.07.2015.
 */

function Interpreter(){

}

Interpreter.ProcessAssign=function (syntaxNode){
    var id=syntaxNode.value[0];
    var value=syntaxNode.value[2];
    if(id.isToken && id.value.type==="id")
    {
        if(value.isToken)
        {

        }
    }
};
Interpreter.prototype.interpret=function(syntaxTree)
{
    if(syntaxTree.isToken)
    {
        return syntaxTree.value;
    }
    var symbol=syntaxTree.symbol;

    switch (symbol)
    {
        case 'EQ':

            break;
    }
}

