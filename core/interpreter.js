/**
 * Created by Dzhambulat on 23.07.2015.
 */

function Interpreter(){

}

Interpreter.prototype.globalTable={

};
Interpreter.prototype.addSymbolToTable=function(symbolName,value)
{
    this.globalTable[symbolName]={
        value:value
    };

    return this.globalTable[symbolName];
}

Interpreter.prototype.processAssign=function (syntaxNode){
    var id=syntaxNode.value[0];
    var rightValue=syntaxNode.value[2];
    if(id.isToken && id.value.type==="id")
    {
        if(rightValue.isToken)
        {
            idName=id.value.value;
            var symbol=this.addSymbodlToTable(idName,rightValue.value.value);
            symbol.type=rightValue.value.value.type;
        }
    }
};

Interpreter.prototype.processAriphmetic=function (syntaxNode){

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
        case 'EQ':
            this.processAssign(syntaxTree);
            break;
    }
}

