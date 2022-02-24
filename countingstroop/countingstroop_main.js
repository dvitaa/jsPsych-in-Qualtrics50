// Use JSDELIVR to get the files from a GitHub repository
// https://cdn.jsdelivr.net/gh/<github-username>/<repository-name>/
var repo_site = "https://cdn.jsdelivr.net/gh/dvitaa/jsPsych-in-Qualtrics8/countingstroop/";

/* experiment parameters */
var reps_per_trial_type_practice = 2;
var reps_per_trial_type = 4;

/*set up welcome block*/
var welcome = {
    type: "html-keyboard-response",
    stimulus: "You will now complete a series of tasks. Press any key to begin."
};

/*set up practice instructions block*/
var instructions_practice = {
    type: "html-keyboard-response",
    stimulus: "<p>In this task, you will see words on a screen, like the example below.</p>" +
        "<img src='" + repo_site + "img/1.png'></img>" +
        "<p> Count the number of words on the screen. (<)</p>" +
        "<p>Press the number key corresponding to the number of words on the screen. </p>" +
        "<p> For example, if there are three words on the screen you will press the '4' number key on your keyboard. </p>" +
        "<p>You will first complete a practice round. </p>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 1000
};

/*defining stimuli*/ //*add imgs*//
var test_stimuli = [{
        stimulus: repo_site + "img/1.png",
        data: {
            stim_type: 'noun',
            count: '4'
        }
    },
    {
        stimulus: repo_site + "img/2.png",
        data: {
            stim_type: 'number',
            count: '3'
        }
    },
    {
       /* stimulus: repo_site + "img/inc1.png",
        data: {
            stim_type: 'incongruent',
            direction: 'right'
        }
    },
    {
        stimulus: repo_site + "img/inc2.png",
        data: {
            stim_type: 'incongruent',
            direction: 'left'
        } */
    }
];


/*defining practice trial*/

var practice = {
    timeline: [{
        type: 'image-keyboard-response',
        choices: [49, 50, 51, 52],
        trial_duration: 1500,
        stimulus: jsPsych.timelineVariable('stimulus'),
        data: jsPsych.timelineVariable('data'),
        on_finish: function (data) {
            var correct = false;
            if (data.count == '1' && data.key_press == 49 && data.rt > -1) {
                correct = true;
            } else if (data.count == '2' && data.key_press == 50 && data.rt > -1) {
                correct = true;
            }else if (data.count == '3' && data.key_press == 51 && data.rt > -1) {
                correct = true;
            }else if (data.count == '4' && data.key_press == 52 && data.rt > -1) {
                correct = true;
            }
            data.correct = correct;
        },
        post_trial_gap: function () {
            return Math.floor(Math.random() * 1500) + 500;
        }
    }],
    timeline_variables: test_stimuli,
    sample: {
        type: 'fixed-repetitions',
        size: reps_per_trial_type_practice
    }
};

/*task instructions*/
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p> The task will now begin. Press any key to start. </p>",
    post_trial_gap: 1000
};


/* defining test timeline */
var test = {
    timeline: [{
        type: 'image-keyboard-response',
        choices: [49, 50, 51, 52],
        trial_duration: 1500,
        stimulus: jsPsych.timelineVariable('stimulus'),
        data: jsPsych.timelineVariable('data'),
        on_finish: function (data) {
            var correct = false;
            if (data.count == '1' && data.key_press == 49 && data.rt > -1) {
                correct = true;
            } else if (data.count == '2' && data.key_press == 50 && data.rt > -1) {
                correct = true;
            }else if (data.count == '3' && data.key_press == 51 && data.rt > -1) {
                correct = true;
            }else if (data.count == '4' && data.key_press == 52 && data.rt > -1) {
                correct = true;
            }
            data.correct = correct;
        },
        post_trial_gap: function () {
            return Math.floor(Math.random() * 1500) + 500;
        }
    }],
    timeline_variables: test_stimuli,
    sample: {
        type: 'fixed-repetitions',
        size: reps_per_trial_type
    }
};
/*maybe don't use count*/
/*defining debriefing block*/
var debrief = {
    type: "html-keyboard-response",
    stimulus: function () {
        var total_trials = jsPsych.data.get().filter({
            trial_type: 'image-keyboard-response'
        }).count();
        var accuracy = Math.round(jsPsych.data.get().filter({
            correct: true
        }).count() / total_trials * 100);
        var count_rt = Math.round(jsPsych.data.get().filter({
            correct: true,
            stim_type: 'congruent'
        }).select('rt').mean());
        var incongruent_rt = Math.round(jsPsych.data.get().filter({
            correct: true,
            stim_type: 'incongruent'
        }).select('rt').mean());
        return "<p>You responded correctly on <strong>" + accuracy + "%</strong> of the trials.</p> " +
            "<p>Your average response time for congruent trials was <strong>" + congruent_rt + "ms</strong>.</p>" +
            "<p>Your average response time for incongruent trials was <strong>" + incongruent_rt + "ms</strong>.</p>" +
            "<p>Press any key to complete the experiment. Thank you!</p>";
    }
};

/*set up experiment structure*/
var timeline = [];
timeline.push(welcome);
timeline.push(instructions_practice);
timeline.push(practice);
timeline.push(instructions);
timeline.push(test);
timeline.push(debrief);


