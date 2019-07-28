// Input values from form controls are retrieved and stored in local variables //
function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset(); // Empties form //

    fetchIssues(); // Regenerate list output //

    e.preventDefault(); // To avoid the default submission of the form //
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue); // an event handler to save issue data to local storage after form submit //

function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues')); // retrieves issues from Local Storage and parses the string result into a JSON object //
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="card-body text-center">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<a href="#" class="badge badge-success">' + status + '</a>'+
                                '<h3>' + desc + '</h3>'+
                                '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ' + severity + ' '+ 
                                '<i class="fa fa-user-circle" aria-hidden="true"></i> ' + assignedTo + '</p>'+ 
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> ' + '</div>';
    }
}

function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = "Closed";
      }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}


/* Figure out function for this function and input to appear
function setStatusReopened (id) {
      var issues = JSON.parse(localStorage.getItem('issues'));

      for(var i = 0; i < issues.length; i++) {
          if (issues[i].id == id) {
              issues[i].status = "Reopened";
          }
    }

      localStorage.setItem('issues', JSON.stringify(issues));

      fetchIssues();
}

*/