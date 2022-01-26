const { Observable } = require('rxjs')
const { map , filter } = require('rxjs/operators')


const user = {
    data:[
        {status:"active",age:12},
        {status:"active",age:233},
        {status:"inactive",age:13},
        {status:"inactive",age:29},
        {status:"inactive",age:18},
    ]
}

const user2 = {
    data:[
        {status:"active",age:12},
        {status:"active",age:12},
        {status:"active",age:22},
        {status:"inactive",age:13},
        {status:"inactive",age:29},
        {status:"inactive",age:18},
    ]
}


const observable = new Observable((subscriber)=>{
    subscriber.next(user)
    subscriber.next(user)
    subscriber.next(user2)

}).pipe(map((val)=>{
        console.log("1:",val)
        return val.data
    }),
    filter((val)=>val.length>5),
    map((val)=>{
        console.log("2:",val)
        return val.filter(user=> user.status === "active")
    }),
    map((val)=>{
        console.log("3:",val)
        return (val.reduce((sum,user)=>sum + user.age , 0))/val.length
    }),
    map((val)=>{
        console.log("4:",val)
        if(val < 18){
            throw new Error("Average age is to less")
        }
        else {
            return val
        }
    }),

)

// console.log(observable)
const observer = {
    next : (val) => {
        console.log("Observer got value of "+val)
    },
    error: (err)=>{
        console.log("Observer got err of "+err)
    },
    complete : ()=>{
        console.log("Observer got complete notifications");
    }
}

observable.subscribe(observer)