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
    if(id.isToken && id.type==="id")
    {
        if(rightValue.isToken)
        {
            var idName=id.value;
            var symbol=this.addSymbolToTable(idName,rightValue.value);
            symbol.type=rightValue.type;
        }
        else if (rightValue.symbol==='AS')
        {
            var idName=id.value;
            var idValue=this.processAriphmetic(rightValue.value[0])
            var symbol=this.addSymbolToTable(idName,idValue);
            symbol.type='number';
        }
    }
};

Interpreter.prototype.processAriphmetic=function (syntaxNode){

    var self=this;
    function processT(syntaxNode)
    {
        if(syntaxNode.value[0].isToken)
        {
            return syntaxNode.value[0].value;
        }
    }

    function processTlpoperatorE(syntaxNode)
    {
        if(syntaxNode.value.length===3)
        {
            var lp1=processT(syntaxNode.value[0]);
            var operator=syntaxNode.value[1];
            var lp2=self.processAriphmetic(syntaxNode.value[2]);

            switch(operator.value)
            {
                case '+':
                    return parseFloat(lp1)+parseFloat(lp2);
                case '-':
                    return parseFloat(lp1)-parseFloat(lp2);
            }
        }
    }

    if(syntaxNode.value.length===3)
    {
        return processTlpoperatorE(syntaxNode);
    }
    else
    {
        return processT(syntaxNode.value[0]);
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
            this.interpret(syntaxTree.value[0]);
            break;
    }
}

