/**
 * Created by Dzhambulat on 05.02.2015.
 */

function Parser(){

}

Parser.prototype.CFG={
    S:['VS','C'],
    V:['let'],
    C:['I','IPM'],
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

        if (!this.isTerminal(p.products[point]))
        {
            var currentProducts=this.CFG[p.products[point]];

            for (var i in currentProducts)
            {
                var e={
                    pointIndex:0,
                    products:currentProducts[i],
                    symbol:p.products[point]
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


}