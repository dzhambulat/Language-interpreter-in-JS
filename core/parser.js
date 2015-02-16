/**
 * Created by Dzhambulat on 05.02.2015.
 */

function Parser(){

}

Parser.prototype.CFG={
    S:['V S','C'],
    V:['let'],
    C:['I','I PM'],
    I:['id'],
    PM:['st'],
    VL:['I','st','num']
}

Parser.prototype.isTerminal=function(s)
{
    var fs=s.charCodeAt(0);
    if(fs>=97 && fs<=122)
    {
        return true;
    }
    else
    {
        return false;
    }
}

Parser.prototype.isInQueue=function(queue,elem)
{
    return queue.some(function(el)
    {
        if (el.pointIndex==elem.pointIndex &&
            el.products==elem.products)
        {
            return true;
        }
        else
        {
            return false;
        }
    })
}

Parser.prototype.first=function(nt)
{
    var cands=[];
    cands.push.apply(cands,this.CFG[nt]);
    var terms=[];

    var i=0;
    while (cands.length>0)
    {
        var cand=cands[0];
        cands.splice(i,1);

        var fs=cand.charCodeAt(0);
        if(fs>=97 && fs<=122)
        {
            terms.push(cand[0].match(/([a-z]+)/)[1]); // get terminal
        }
        else
        {
            cands.unshift.apply(cands,this.CFG[cand[0]]);
        }
    }

    return terms;
}

Parser.prototype.closure=function(products)
{
    var queue=[];
    var res=[];
    queue.push.apply(queue,products);


    while (queue.length!=0)
    {
        var p=queue.shift();
        var point= p.pointIndex;
        res.push(p);

        var product= p.products.split(' ');
        if (!this.isTerminal(product[point]))
        {
            var currentProduct=this.CFG[product[point]];

            for (var i in currentProduct)
            {
                var e={
                    pointIndex:0,
                    products:currentProduct[i],
                    symbol:product[point]
                };
                if(!this.isInQueue(queue,e))
                {
                    queue.push(e);
                }
            }
        }
    }

    return res;
}

Parser.prototype.goto=function(products,symbol)
{
    var res=[];

    for (var i in products)
    {
        var p=products[i];
        var product= p.products.split(' ');
        if (product[p.pointIndex]===symbol)
        {
            res.push(
                {
                    pointIndex:++p.pointIndex,
                    products: p.products,
                    symbol: p.symbol
                }
            );
        }
    }

    return res;

}

Parser.prototype.reduce=function(product,stack)
{
    var node= {
        isToken: false
    }
    var presult=[];

    for (var i=0;i<product.pointIndex;i++)
    {
        var el=stack.pop();
        presult.unshift(el);
    }

    node.value=presult;

    return node;
}