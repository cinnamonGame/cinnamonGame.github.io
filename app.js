var word = 'sleep';
var synonyms, antonyms;
var curSynonymIndex = 0;
var curAntonymIndex = 0;
var curParagraphIndex = 1;
$(document).ready(function() {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/thesaurus?word=' + word,
        headers: { 'X-Api-Key': 'zPi8MJoFrthPcqZEBshcyw==kgGJkphC8E5L7Hmv' }, // Replace with your API Key
        contentType: 'application/json',
        success: function(result) {
            console.log(result)
            if (result && result.synonyms && result.antonyms && result.antonyms.length > 0 && result.synonyms.length > 0){
                synonyms = result.synonyms;
                antonyms = result.antonyms;
            } else {
                $('#synonym').text('Invalid word, try again tomorrow')
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

    $('#synButton').click(function(){
        if (curParagraphIndex <= 6) {
            var $currentParagraph = $('#synonym'+curParagraphIndex);
            if (curSynonymIndex < synonyms.length){
                $currentParagraph.text(synonyms[curSynonymIndex]);
                curSynonymIndex++;
            } else {
                alert("Not enough synonyms. Showing an antonym instead.");
                $currentParagraph.text(antonyms[curAntonymIndex % antonyms.length]);
                curAntonymIndex++;
            }
            $currentParagraph.css('opacity', 1);
            curParagraphIndex++;
        }
    });
    $('#antButton').click(function(d){
        if (curParagraphIndex <= 6){
            var $currentParagraph = $('#synonym'+curParagraphIndex);
            if (curAntonymIndex < antonyms.length) {
                $currentParagraph.text(antonyms[curAntonymIndex]);
                curAntonymIndex++;
            } else {
                alert("Not enough antonyms. Showing a synonym instead.");
                $currentParagraph.text(synonyms[curSynonymIndex % synonyms.length]);
                curSynonymIndex++;
            }
            $currentParagraph.css('opacity', 1);
            curParagraphIndex++;
        }
    })
});

function checkGuess() {
    var userGuess = $('#guess').val();
    if (userGuess == word){
        $('#changeText').text('SUCCESS!!!');
    } else {
        if (synonyms.length > 1){
            $('#synonym2').text('Synonym: ' + synonyms[1]).css('opacity', 1)
        } else {
            $('#synonym2').text('Antonym: ' + antonyms[1]).css('opacity', 1)
        }

    }
}