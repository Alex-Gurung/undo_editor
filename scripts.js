const fs = require('fs');
const {dialog} = require('electron').remote;

var editors = []

var el = document.getElementById("codeeditor")
var editor = CodeMirror(el, {
    lineNumbers: true,
    mode:"javascript",
    theme:"pastel-on-dark"
})
editors.push(editor)

editor.setSize(null, '100vh')

Mousetrap.bindGlobal('alt+c', () => { create_selector() })

Mousetrap.bindGlobal('alt+u', () => { undo_selection() })

Mousetrap.bindGlobal('alt+s', () => { save_file() })

Mousetrap.bindGlobal('alt+o', () => { open_file() })

function create_selector() {
    var new_editor = document.createElement("div")
    var editors_div = document.getElementById('editors')
    editors_div.appendChild(new_editor)
    var temp_editor = CodeMirror(new_editor, {
    lineNumbers: true,
    mode:"javascript",
    theme:"pastel-on-dark"
})
    editors.push(temp_editor);
    for (var i = 0; i < editors.length; i ++){
        editors[i].setSize(null, String(100*1/editors.length)+'vh')
    }
}


function open_file() {
    dialog.showOpenDialog((fileNames) => {
        if (fileNames === undefined) {
            console.log('no file selected')
            return;
        }
        fs.readFile(fileNames[0], "utf-8", (err, data) => {
            if (err){
                console.log('and error occured in reading in file')
                return;
            }
            editor.setValue(data)
            console.log("content retrieved")
            alert("file retrieved")
        })
    });
}

function save_file() {
    let content = editor.getValue()

    dialog.showSaveDialog((filename) => {
        if (filename === undefined){
            console.log("no file created")
            return;
        }
        fs.writeFile(filename, content, (err) => {
            if (err){
                console.log("An error has occured in writing file")
                return;
            }
            alert('file created!')
        })
    });
}

function undo_selection() {
    // var i = editor.getSelection();
    console.log(editor.getSelection())
    console.log(editor.getCursor(true))
    console.log(editor.getCursor(false))
    console.log(editor.getHistory())
    // console.log(editor.listSelections())
    // alert(editor.getSelection())
}