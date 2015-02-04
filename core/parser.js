/**
 * Created by Dzhambulat on 05.02.2015.
 */

function Parser(){

}

Parser.prototype.CFG={
    S:['VS','C'],
    C:['I','I PM'],
    I:['id'],
    PM:['VL','VL,PM'],
    VL:['I','st','num']
}