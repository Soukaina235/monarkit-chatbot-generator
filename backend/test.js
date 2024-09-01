const getStepClass = (step) => {
    if (data.training_step === step) {
        return 'completed';
    } 
    if (steps.indexOf(data.training_step) > steps.indexOf(step)) {
        return 'completed';
    } else {
        return '';
    }
};

console.log('getStepClass:', getStepClass('processing'));