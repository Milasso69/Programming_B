var client
var topic = 'JegElskerFødder'
var me

function setup() {
    // Bind controllerens knapper og send handlinger over MQTT her.

    select('#playerA').mousePressed(()=>choosePlayer('A'))
    select('#playerB').mousePressed(()=>choosePlayer('B'))
    select('#forward').mousePressed(()=> choice('forward'))
    select('#back').mousePressed(()=> choice('back'))
    select('#select').mousePressed(()=> choice('select'))
    

     client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', ()=>{
        showToast('forbunt tiil mqtt')
        client.subscribe(topic)
    })
    client.on('message', (topic, ms) => {
        showToast(`modto bese:${ms.toString()}`)
        var msObject = JSON.parse(ms.toString())
        console.log(msObject.name)

        if(msObject.action == "choose character"){
            if(select(`#Player${msObject.name}`)){
                select(`#Player${msObject.name}`).hide()
                
            }
        }
    })
}
function choosePlayer(n){
    me = n
    var obj = {
        "name":n,
        "action":"choose character"
    }
    obj = JSON.stringify(obj)
    client.publish(topic,obj)
    select('#name').html(`i am ${me}`)
    shiftPage('#choose')
   
}

function choice(direction){
    var obj = {
        "name":me,
        "action":direction
    }
    obj = JSON.stringify(obj)
    client.publish(topic,obj)
    
}