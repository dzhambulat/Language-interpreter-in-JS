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
            var symbol=this.addSymbolToTable(idName,rightValue.value.value);
            symbol.type=rightValue.value.value.type;
        }
        else if (rightValue.symbol==='AS')
        {
            idValue=this.processAriphmetic(rightValue[0])
            var symbol=this.addSymbolToTable(idName,idValue);
            symbol.type='number';
        }
    }
};

Interpreter.prototype.processAriphmetic=function (syntaxNode){

    function processT(syntaxNode)
    {
        if(syntaxNode.values[0].isToken)
        {
            return syntaxNode.values[0].value;
        }
    }
    if(syntaxNode.values.length===3)
    {

    }
    else
    {
        return processT(syntaxNode.values[0]);
    }

}
Interpreter.prototype.interpret=function(syntaxTree)
{
    var symbol=syntaxTree.symbol;

    switch (symbol)
    {
        case 'EQ':
            this.processAssign(syntaxTree);
            break;
        case 'SA':
            this.interpret(syntaxTree.values[0]);
            break;
    }
}

