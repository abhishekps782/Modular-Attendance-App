var model =  {
  numSchoolDays: 12,

  init: function(){
    if(localStorage.attendance) {
      this.students = JSON.parse(localStorage.attendance);
    }
    else{
      this.initAttendance();
    }
  },

  students: [{
      name: "Abhishek",
      daysAttended: [],
      absenceCount: 12
    },
    {
      name: "Vivek",
      daysAttended: [],
      absenceCount: 12
    },
    {
      name: "Vaibhav",
      daysAttended: [],
      absenceCount: 12
    },
    {
      name: "Ankit",
      daysAttended: [],
      absenceCount: 12
    },
    {
      name: "Uday",
      daysAttended: [],
      absenceCount: 12
    },
    {
      name: "Amit",
      daysAttended: [],
      absenceCount: 12
    }
  ],

  initAttendance: function (){
     var self = this;
     this.students.forEach(function(student){
       /*For each student set daysAttended*/
       var daysAttended = student.daysAttended;
       for (var i = 0; i < self.numSchoolDays; i++) {
         var isPresent = Math.random()>0.5? 1 : 0;
         daysAttended.push(isPresent);
         if(isPresent){
           self.setAbsenceCount(student,isPresent);
         }
       }
     });
  },
  setAbsenceCount: function(student,isPresent){
    if(isPresent){
      student.absenceCount--;
    }
  },
  updateAbsenceCount : function(indexArr, daysIndex, checked){
    var student = this.students[indexArr];
    checked ? student.absenceCount -=1 : student.absenceCount +=1;
    this.setdaysAttended(student,daysIndex,checked)
  },

  setdaysAttended: function(student, daysIndex, checked){
    student.daysAttended[daysIndex] = checked;
  },

  saveAttendance: function(){
    localStorage.attendance = JSON.stringify(viewModel.getStudents());
  }
};


var viewModel = {
     init: function(){
       model.init();
       view.init();
     },

     getStudents : function(){
       return model.students;
     },

     updateAbsenceCount : function(arrIndex, daysIndex, checked){
        /* adjusting for array index */
        var indexArr = arrIndex - 1;
        var daysIndex = daysIndex -1;
        var absenceCount;
        model.updateAbsenceCount(indexArr, daysIndex, checked);
        view.updateAbsenceCountEle('missedCol'+ arrIndex, model.students[indexArr].absenceCount);
        model.saveAttendance();
     },

     getNumOfSchoolDays: function(){
       return model.numSchoolDays;
     }
}

var view = {
     init: function(){
       this.tbodyEle = $('#studentsAttendanceGrid');
       this.headerEle = $('thead');
       this.tbodyEle.on('click','input',function(e){
         var studentIndex = parseInt($(e.target).parents('tr').attr('id'));
         var daysIndex = parseInt($(e.target).attr('id').replace('day',''));
         viewModel.updateAbsenceCount(studentIndex, daysIndex, e.target.checked);
       });
       this.render();
     },

     render: function(){
       var self = this;
       self.tbodyEle.html('');
       self.headerEle.html('');
       this.renderHeaderRow();
       this.renderBodyRows();
     },

     renderHeaderRow: function(){debugger;
        var self = this;
        var numOfSchoolDays = viewModel.getNumOfSchoolDays();
        var $tr = $('<tr></tr>');
        $tr.append($('<th>Student Name</th>'));
        for (var i = 0; i< numOfSchoolDays; i++) {
          var $td = $('<th>'+(i+1)+'</th>');
          $tr.append($td);
        }
        $tr.append('<th>Days Missed-Col</th>');
        self.headerEle.append($tr);
     },

     renderBodyRows: function(){debugger;
       var self = this;
       var students = viewModel.getStudents();
       var numOfSchoolDays = viewModel.getNumOfSchoolDays();
       students.forEach(function(student,index){
          var $tr = $('<tr id="'+(index+1)+'"></tr>')
          $tr.append($('<td>"'+student.name+'"</td>'))
          /* append checkboxes */
          for (var i = 0; i< numOfSchoolDays; i++) {
            var $td = $('<td><input id="day'+(i+1)+'" type="checkbox"></td>');
            $td.children('input').prop('checked',student.daysAttended[i]);
            $tr.append($td);
          }

          $tr.append('<td id="missedCol'+(index+1)+'">'+student.absenceCount+'</td>');
          self.tbodyEle.append($tr);
       });
     },

     updateAbsenceCountEle: function(id, absenceCount){
        $('#'+ id).text(absenceCount);
     },

     updateCheckBox: function(){
        $('input[type="checkbox"]').each(function(chkbox){
          chkbox.prop('checked',)
        })
     }
}

viewModel.init();
