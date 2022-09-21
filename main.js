

let inputVal=null
let Cmdhistory = []


const topbanner = `
____  __                     _     
/ __ \/ /_  ____  ___  ____  (_)  __
/ /_/ / __ \/ __ \/ _ \/ __ \/ / |/_/
/ ____/ / / / /_/ /  __/ / / / />  <  
/_/   /_/ /_/\____/\___/_/ /_/_/_/|_|  
`

const welcomeMessage = `Welcome to my terminal site built for the geeky members who just can't resist a terminal. <br>Type 'help' to view a list of available commands.`;

const terminalContent = document.querySelector('.terminal-content')

document.querySelector('.terminalbanner').children[0].textContent = topbanner


const terminalwelcomediv = document.createElement('div')
terminalwelcomediv.classList.add('terminal-welcome-message')
terminalwelcomediv.innerHTML = welcomeMessage

terminalContent.appendChild(terminalwelcomediv)


const terminalinput = document.createElement('div')
terminalinput.classList.add('terminal-inputarea')
terminalinput.innerHTML = (`
    <span class="terminal-prompt">guest@liveterm.phoenix.com:$  ~</span>
    <span><input type="text" name="" id="" class="terminal-input" autofocus></span>
`)


terminalContent.appendChild(terminalinput)


const terminalinpfunc = ()=>{
    const terminalinput = document.createElement('div')
    terminalinput.classList.add('terminal-inputarea')
    terminalinput.innerHTML = (`
    <span class="terminal-prompt">guest@liveterm.phoenix.com:$  ~</span>
    <span><input type="text" name="" id="" class="terminal-input" autofocus></span>
`)

    terminalinput.addEventListener('input',inputEvent)
    terminalinput.addEventListener('keydown',keydownEvent)

    terminalContent.append(terminalinput)
    document.querySelector('.terminal-input').focus()

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const helpdsiplay = ()=>{
    const display = document.createElement('div')
    display.classList.add('terminal-command-output')
    fetch('./data.json')
    .then(res=>res.json())
    .then(async data=>{

        const val = data.help
        const ulist = document.createElement('ul')
        display.append(ulist)
        
        for(let key in val){
            const ele = document.createElement('li')
            ele.innerHTML = (`
            <span id="spantxt">${key}</span><span id="spandd">${val[key]}</span>
            `)

            ulist.append(ele)    
            await sleep(50)
            display.scrollIntoView()
            // display.append(ele)
        }

        // display.append(ulist)
        display.scrollIntoView()
    })

    // terminalContent.append(display)
    return display;
}


const sociallinks = ()=>{
    const social = document.createElement('div')
    social.classList.add('terminal-command-output')

    fetch('./data.json')
    .then(res=>res.json())
    .then(data=>{

        social.innerHTML = (`
        <ul>
        <li><span id="spantxt"><a id="spantxt" href = https://www.linkedin.com/in/debayan-pradhan-b138641b4/" target="_blank">LinkedIn</a></span><span id="spandd">${data.socials.linkedin}</span></li>
        <li><span id="spantxt"><a id="spantxt" href = "https://twitter.com/m4lw4r3_01" target="_blank">Twitter</span></a><span id="spandd">${data.socials.twitter}</span></li>
        <li><span id="spantxt"><a id="spantxt" href = "https://github.com/Phoenix-031" target="_blank">Github</span></a><span id="spandd">${data.socials.github}</span></li>
        </ul>

        `)
      
        social.scrollIntoView()
    })
    terminalContent.append(social)
}


const historydisplay = ()=>{
    const display = document.createElement('div')
    display.classList.add('terminal-command-output')
    for(let i =0;i<Cmdhistory.length;i++){
        const p = document.createElement('p')
        p.innerHTML = (`${Cmdhistory[i]}`)
        display.append(p)
    }

    terminalContent.append(display)
}

const clearterminal = ()=>{
    while(terminalContent.firstChild){
        terminalContent.removeChild(terminalContent.lastChild)
    }
}

const displaybanner = ()=>{
    const display = document.createElement('div')
    display.classList.add('terminal-command-output')
    display.innerHTML = (`
    <pre>${topbanner}</pre>
    `)

    return display
}


const openlinks = (text,link)=>{
    const display = document.createElement('div')
    display.classList.add('terminal-command-output')
    display.innerHTML = (`
    Opening ${text}....
    `)
    terminalContent.append(display)
    window.open(link)
}

const displayabout = ()=>{
    const about = document.createElement('div')
    about.classList.add('terminal-command-output-about')
    about.innerHTML = (`
    <h3>Hello i'm Debayan Pradhan</h3><br>

    <p>I'm currently doing my Bachelor's in Computer Science and Engineering<br>
       I'm an aspiring Software Developer<br>
       I love building projects<br>
       I have learnt most of the things that i know today through projects<br>
       and am proud to be a part of the opensource community and celebrate software in it's true sense<br>
    </p><br><br>
    <p>
    I'm interested in : Blockchain  |  Cryptography  |  Web3  |  Malware developement and analysis<br>
    even though each of these is pretty vast field, i'm still trying my best to get my head around and feed<br>
    my thirst and learn and understand these technologies to the best of my abilities
    </p>
    `)

    terminalContent.append(about)
    // return about
}

const cmdnotfound = (cmd)=>{
    const display = document.createElement('div')
    display.classList.add('not-found')
    display.innerHTML = (`
    <span>command not found : ${cmd}</span><br>
    <p>Type 'help' to view the list of available commands</p>
    `)

    terminalContent.append(display)
    // return display
}

const displaycontent = (val)=>{
    const display = document.createElement('div')
    display.classList.add('terminal-command-output')
    display.innerHTML = (`
    ${val}
    `)

    terminalContent.append(display)
}

const downloadURI = (uri,name)=>{
    const link = document.createElement('a')
    link.download = name
    link.href = uri
    link.click()
}

const displayprojects = ()=>{
    const display = document.createElement('div');
    display.classList.add('terminal-command-output') 
    fetch('./data.json')
    .then(res=>res.json())
    .then(async data=>{
        const val = data.projects
        for(let key in val){
            const nw = document.createElement('div')
            nw.classList.add('projectElements')
            nw.innerHTML = (`
            <a class="projectKey" href = "${val[key].link}" target="_blank"><span>${key}</span></a>
            <span id="projectdd">${val[key].description}</span>
            `)

            await sleep(50)
            display.scrollIntoView()
            display.append(nw)
        }
        
        display.scrollIntoView()
    })

    // return display
    terminalContent.append(display)
}

const displaycontact = ()=>{
    const display = document.createElement('div');
    display.classList.add('terminal-command-output') 

    fetch('./data.json')
    .then(res=>res.json())
    .then(async data=>{
        const val = data.contact
        for(let key in val){
            const nw = document.createElement('div')
            nw.classList.add('projectElements')
            nw.innerHTML = (`
            <span class="projectKey">${key} :</span>
            <a class="linkKey" href = "${val[key]}" target="_blank"}"><span link="mailto:pradhandebayan@gmail.com">${val[key]}</span></a>
            `)

            await sleep(50)
            display.scrollIntoView()
            display.append(nw)
        }
        
        display.scrollIntoView()
    })

    // return display
    terminalContent.append(display)
}



const switchfunc = (cmd)=>{
    console.log(cmd)
    if(cmd ===null){
        displaycontent("");
    }
    else{
        switch(cmd.toLowerCase()){
            case 'socials':
                sociallinks()
                inputVal=null;
                break;
            case 'help':
                // helpdsiplay()
                terminalContent.append(helpdsiplay())
                inputVal=null;
                break;
            case 'history':
                historydisplay()
                inputVal=null;
                break;
            case 'clear':
                clearterminal();
                inputVal=null;
                break;
            case 'banner':
                terminalContent.append(displaybanner());
                inputVal=null;
                break;
            case 'github':
                openlinks('Github','https://github.com/Phoenix-031');
                inputVal=null;
                break;
            case 'twitter':
                openlinks('Twitter','https://twitter.com/m4lw4r3_01');
                inputVal=null;
                break;
            case 'linkedin':
                openlinks('LinkedIn','https://www.linkedin.com/in/debayan-pradhan-b138641b4/');
                inputVal=null;
                break;
            case 'about':
                displayabout()
                inputVal=null;
                break;
            case 'gui':
                window.open('https://phoenix-031.github.io/');
                inputVal=null;
                break;
            case 'cv':
                downloadURI('./DebayanPradhan.pdf','Debayan Pradhan - CV')
                inputVal=null;
                break;
            case 'projects':
                displayprojects()
                inputVal=null;
                break;
            case 'contact':
                displaycontact();
                inputVal=null;
                break;
            case 'whoami':
                displaycontent('guest');
                inputVal=null;
                break;
            case 'pwd':
                displaycontent('/home/debayan');
                inputVal=null;
                break;
            default:

                if(cmd.split(' ')[0] === 'echo'){
                    displaycontent(cmd.split(' ')[1])
                    inputVal=null;
                }
                else
                    cmdnotfound()
                break;
        }
    }

}



const inserttermrecord = ()=>{
    const termrecord = document.createElement('div')
    termrecord.classList.add('terminal-inputarea')
    if(inputVal === null){
        termrecord.innerHTML = (`
        <span class="terminal-prompt">guest@liveterm.phoenix.com:$~</span>
        <span class="terminal-cmd"><span>
        `)
    }
    else{
        termrecord.innerHTML = (`
        <span class="terminal-prompt">guest@liveterm.phoenix.com:$~</span>
        <span class="terminal-cmd">${inputVal}<span>
        `)
    }
    return termrecord

}

const inputEvent = (e)=>{
    inputVal = e.target.value
    // console.log(inputVal)
}

const keydownEvent = (e)=>{
    if(e.key === "Enter"){

        if(inputVal !== null)
           Cmdhistory.push(inputVal)
        terminalContent.removeChild(terminalContent.lastChild)
        terminalContent.append(inserttermrecord())

        switchfunc(inputVal)
        terminalinpfunc()

    }
}


terminalinput.addEventListener('input',inputEvent)
terminalinput.addEventListener('keydown',keydownEvent)
