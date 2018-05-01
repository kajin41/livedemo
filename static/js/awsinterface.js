var userData = null;
var userJournal = null;

var symptomavg = [];

var getuser = function(user, callback) {
    $.ajax({
        url: "https://3dj9znidj6.execute-api.us-east-1.amazonaws.com/latest/" + user,
        type: "GET",
        data: null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            userData = data['Items'][0];
            userJournal = data['Items'][0]['Journal Entries']['M'];
            callback(data['Items'][0]);
        }
    });
};

var makeDays = function() {
    console.log(userJournal);
     for (entry in userJournal) {
         console.log(new Date(parseInt(entry)).toDateString());
         if($('#doctor-notes-pane').children('#entry-date-' + new Date(parseInt(entry)).toDateString()).length != 0){
             console.log($('#entry-date-' + new Date(parseInt(entry)).toDateString()))
         }else {
           $('#doctor-notes-pane').append(
           `<div id="entry-date-` + new Date(parseInt(entry)).toDateString() + `" class="row entry-container">
                           <div class="row entry"><div class="arrow">▶</div><div>` + new Date(parseInt(entry)).toDateString() +`</div></div>
                           <div class="row entryBody">
                              <div class="col-md-12 journal-daily-symptoms">
                                  <div class="row">
                                      <div class="col-md-6">Disdociation: 3.5 <span class="red">▲</span></div><div class="col-md-6">Anxiety: 2.6 <span class="green">▼</span></div>
                                      <div class="col-md-6">Depression: 3.1 <span class="red">▲</span></div><div class="col-md-6">Agression: 1.4 <span class="green">▼</span></div>
                                  </div>
                              </div>
                              <div class="row sub-entry"><div class="arrow">▶</div><div>Crisis Assistant</div></div>
                              <div class="row sub-entryBody">
                                  <div class="col-md-12"><b>Crises Reported:</b> 7</div>
                                  <div class="col-md-12"><b>Crisis Symptoms:</b> Dissociation</div>
                                  <div class="col-md-12"><b>Average Duration:</b> 3min 10s</div>
                                  <div class="col-md-12"><b>Most Used Tool:</b> Color Finder</div>
                              </div>
                              <div class="row sub-entry"><div class="arrow">▶</div><div>Journal Entries</div></div>
                              <div class="sub-entryBody">
                                  <p class="col-md-12 card">Reminded of the incident after looking at some old photos</p>
                                  <p class="col-md-12 card">Heard a loud screech from a train which triggered a flashback</p>
                              </div>
                              <div class="row sub-entry"><div class="arrow">▶</div><div>Session Notes</div></div>
                              <div class="sub-entryBody">
                                  <p class="col-md-12">Patient showed significant improvement</p>
                              </div>

                           </div>
                       </div>`
           );
         };
     };
};

getuser("gc1SqM6h",
        function(data){
            console.log(data);
            makeDays();
        }
);






