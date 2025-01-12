const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";
const email ="robinnair321@gmail.com";
const password = "acb132@";

const solution = require('./code.js');

let cpages;
const browseropen = puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null
})
browseropen.then(function(browser){
   const BrowserOpenPromise = browser.pages();
   return BrowserOpenPromise;
}).then(function(newtab){
    cpages = newtab[0];
   const gotopagepromise = cpages.goto(url,{delay:20});
   return gotopagepromise;
}).then(function(){
    let typeemailPromise = cpages.type("input[type='text']",email,{delay:20})
    return typeemailPromise;
}).then(function(){
    let typepasswordPromise = cpages.type("input[type='password']",password,{delay:20})
    return typepasswordPromise;
}).then(function(){
    let pressloginbutton = cpages.click("button[type='submit']",{delay:20});
    return pressloginbutton;
}).then(function(){
    let clickAtAlgo = waitAndClick(".topic-card a[data-attr1='algorithms']",cpages,{delay:20});
    return clickAtAlgo;
})
.then(function(){
    let selectSubDomain = waitAndClick("input[value='warmup']", cpages ,{delay:20});
    return selectSubDomain;
})

 .then(function(){
     let allProblemSubDomainpromise = cpages.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:100});
     return allProblemSubDomainpromise; 
 })
.then(function(arr){
    console.log("no of questions:"+arr.length);
    let questionWillbesolved = questionSolver(cpages,arr[0],solution.answers[0]);
    return questionWillbesolved;
})



function waitAndClick(selector,currPage){
    return new Promise(function(resolve,reject){
        let waitForModelpromise = currPage.waitForSelector(selector);
        waitForModelpromise.then(function(){
            let clickModel = currPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(error){
            console.log(error);
            reject();
        })

        
    })
}
function questionSolver(currentpages,question,answer){
    return new Promise(function(resolve,reject){
       let questionWillbeclicked = question.click();
        questionWillbeclicked.then(function(){
            let Editorinfocus = waitAndClick(".monaco-editor.no-user-select.standalone.showUnused.showDeprecated.vs",currentpages);
            return Editorinfocus;
        }).then(function(){
            return waitAndClick(".checkbox-input",currentpages);
        }).then(function(){
            return currentpages.waitForSelector("textarea.custominput",currentpages);
        }).then(function(){
            return currentpages.type("textarea.custominput",answer,{delay:20})
        }).then(function(){
            let ctrlpressed = currentpages.keyboard.down('Control');
            return ctrlpressed;
        }).then(function(){
            let AisPressed = currentpages.keyboard.press('A',{delay:100});
            return AisPressed;
        }).then(function(){
            let XisPressed = currentpages.keyboard.press('X',{delay:100});
            return XisPressed;
        }).then(function(){
            let ctrlunpressed = currentpages.keyboard.up('Control');
            return ctrlunpressed;
        }).then(function(){
            let mainEditorinfocus = waitAndClick(".monaco-editor.no-user-select.standalone.showUnused.showDeprecated.vs",currentpages);
            return mainEditorinfocus;
        }).then(function(){
            let ctrlpressed = currentpages.keyboard.down('Control');
            return ctrlpressed;
        }).then(function(){
            let AisPressed = currentpages.keyboard.press('A',{delay:100});
            return AisPressed;
        }).then(function(){
            let VisPressed = currentpages.keyboard.press('V',{delay:100});
            return VisPressed;
        }).then(function(){
            let ctrlunpressed = currentpages.keyboard.up('Control');
            return ctrlunpressed;
        }).then(function(){
            return currentpages.click(".hr-monaco__run-code",{delay:50});
            
        }).then(function(){
            return currentpages.evaluate(() => {
                const button = document.querySelector(".hr-monaco-submit");
                button.scrollIntoView();
                button.click();
            })
        }).then(function(){
            resolve();
        }).catch(function(error){
            console.log(error);
            reject();
        })
    
    })
}


  



