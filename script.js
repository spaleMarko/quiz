window.onload = init;
        var myData = {};
        var page = 0;
        var score = 0;
        var usersAnswer = [];
        
        var out = document.getElementById('output');
        
        document.getElementById('next').addEventListener('click',function(){
           move(page+1); 
        });
        
        document.getElementById('previous').addEventListener('click',function(){
           move(page-1); 
        });
        
        function move(num){
            if(num < 0){
                num = 0;
            }
            if(num >= myData.length){
                summary();
            }else{
                page = num;
            
                buildPage();
            }
        }
        
        function summary(){
            score = 0;
            var html = '<h1>Summary</h1>';
            
            for(var i=0; i<myData.length; i++){
                html += 'Question ' + (i+1) + ' ';
                if(myData[i].correct == usersAnswer[i]){
                   html += 'Correct <br>';
                    score++;
                }else{
                    html += 'Wrong <br>';
                }
            }
            html += 'Your score is' + score + ' out of ' + myData.length;
            out.innerHTML = html;
        }
        
        out.addEventListener('click',function(){
            
            for(var i=0; i<this.children.length; i++){
                this.children[i].classList.remove('active');
            }
            if(!event.target.classList.contains('question')){
                usersAnswer[page] = Number(event.target.dataset.index);
                event.target.classList.add('active');
            }
            console.log(event.target.dataset.id);
        });
        
        function init(){
            getJSON('https://api.myjson.com/bins/k9iiy',function(response){
                myData = response;
                buildPage();
            });
        }
        
        function buildPage(){
            var p = myData[page];
            var html = '';
            html += '<div class="question">' + p.question + '</div>';
            
            for(var i=0; i<p.answers.length; i++){
                var answer = i == p.correct ? true : false;
                var addClass = usersAnswer[page] == i ? 'active' : '';
                html += '<div class="'+addClass+'" data-id="'+answer+'" data-index="'+i+'">' + p.answers[i] + '</div>';
            }
            
            out.innerHTML = html;
        }
        
        function getJSON(url, callback){
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function(){
                if(xhr.status == 200){
                   callback(xhr.response);
                }
            }
            xhr.send();
        }