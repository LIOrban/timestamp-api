var express=require("express");
var moment=require("moment");
var app=express();

app.get('/:time', function(req,res){
    var t = req.params.time;
    var date;
    if (t.length===parseInt(t).toString().length) {date=moment.unix(parseInt(t));}
    else { date=moment(t);}
    res.send({"natural date":getDate(date), "unix timestamp":getUnix(date)});
});

app.get('/', function(req,res){
    res.send({"natural date":null, "unix timestamp":null});
});

function getDate(d) {
    if (!moment(d).isValid()) {return null;}    
    else {
        var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        var resultingDate = months[d.month()]+" "+d.date()+", "+d.year();
        return resultingDate;
    }
}

function getUnix(d) {
    if (!moment(d).isValid()) {return null;} 
    else return d.unix();
}

app.listen(process.env.PORT || 8080);