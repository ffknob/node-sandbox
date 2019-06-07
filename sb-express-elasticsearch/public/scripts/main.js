function onLoad() {
    updateIndicesSelect();
}

function onIndexSelected(index) {
    updateFieldsSelect(index);
}

function onSubmitSearchForm() {
    const index = document.getElementById('indices-select').value;
    const field = document.getElementById('fields-select').value;
    const terms = document.getElementById('terms-field').value;

    axios({
        method: 'post',
        url: '/search',
        data: { index: index, field: field, terms: terms }
    })
        .then(results => {
            updateResults(results.data);
        })
        .catch(err => console.log(err));
}

function updateIndicesSelect() {
    getIndices()
        .then(indices => {
            const select = document.getElementById('indices-select');
            const options = indices.sort().map(index => ({ value: index, text: index }));

            cleanSelect(select);
            updateSelect(select, options);
        })
        .then(() => updateFieldsSelect())
        .catch(err => console.log(err));
}

function updateFieldsSelect() {
    const index = document.getElementById('indices-select').value;

    getFields(index)
        .then(fields => {
            const select = document.getElementById('fields-select');
            const options = fields.sort().map(field => ({ value: field, text: field }));

            cleanSelect(select);
            updateSelect(select, options);
        })
        .catch(err => console.log(err));
}

function updateResults(results) {
    const resultsDiv = document.getElementById('results');
    const resultsTotal = document.getElementById('results-total');
    const resultsList = document.getElementById('results-list');

    resultsDiv.style = 'display: block';

    resultsTotal.innerHTML = results.hits.total;

    results.hits.hits.forEach(_result => {
        let fieldsLi = document.createElement('li');

        Object.keys(_result._source).sort().forEach(key => {
            const fieldSpan = document.createElement('span');
            const keySpan = document.createElement('span');
            keySpan.className = 'key';
            keySpan.innerHTML = `${key}: `;
            const valueSpan = document.createElement('span');
            valueSpan.className = 'value';
            valueSpan.innerHTML = _result._source[key];

            fieldSpan.appendChild(keySpan);
            fieldSpan.appendChild(valueSpan);
            fieldSpan.appendChild(document.createElement('br'));

            fieldsLi.appendChild(fieldSpan);
        });

        resultsList.appendChild(fieldsLi);
    });

}

function getIndices() {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `/indices`
        })
            .then(result => resolve(result.data))
            .catch(err => reject(err))
    });
}

function getFields(index) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `/indices/${index}/fields`
        })
            .then(result => resolve(result.data))
            .catch(err => reject(err))
    });
}

function cleanSelect(select) {
    while (select.firstChild)
        select.removeChild(select.firstChild);
}

function updateSelect(select, options) {
    options.forEach(_option => {
        let option = document.createElement('option');
        option.value = _option.value;
        option.text = _option.text;
        select.appendChild(option);
    });
}
