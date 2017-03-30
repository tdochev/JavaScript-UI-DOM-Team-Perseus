class ToolsManager {
    static get canvas() { return document.getElementById('canvas'); }
    static get context() { return this.canvas.getContext('2d'); }

    static get fabricCanvas() { return this._fabricCanvas }
    static set fabricCanvas(x) { this._fabricCanvas = x }

    static get colors() { return this._colors }
    static set colors(x) { this._colors = x }

    static get tools() { return this._tools }
    static set tools(x) { this._tools = x }

    static get selectedTool() { return this._selectedTool; }
    static set selectedTool(x) { this._selectedTool = x }

    static get selectedColor() { return this._selectedColor; }
    static set selectedColor(x) { this._selectedColor = x }

    static initControls() {
        let toolsTemplate = Handlebars.compile($('#tools-template').html()),
            colorsTemplate = Handlebars.compile($('#colors-template').html());

        this.fabricCanvas = new fabric.Canvas('canvas', { selection: false })
        this.setDefaultToolsAndColors();
        $('.tools').html(toolsTemplate(this.tools));
        $('.colors').html(colorsTemplate(this.colors));

        $('.tool').on('click', function () { ToolsManager.selectTool($(this).attr('data-tool')) });
        $('.color')
            .each((i, x) => { $(x).css('background-color', this.colors[i]); })
            .on('click', function () {
                ToolsManager.selectedColor = $(this).attr('data-color');
                if (ToolsManager.selectedTool == Pencil) {Pencil.select()}
            });

        return this;
    }

    static selectTool(tool) {
        if (this.selectedTool) this.selectedTool.unselect();
        switch (tool) {
            case 'pencil': Pencil.select(); this.selectedTool = Pencil; break;
            case 'rectangle': Rectangle.select(); this.selectedTool = Rectangle; break;
            case 'triangle': Triangle.select(); this.selectedTool = Triangle; break;
            case 'circle': Circle.select(); this.selectedTool = Circle; break;
            case 'line': Line.select(); this.selectedTool = Line; break;
            case 'clear': Clear.select(); break;
        }
    }

    static setDefaultToolsAndColors(colors, tools) {
        this.colors = colors || ['red', 'green', 'blue', 'yellow', 'black'];
        this.tools = tools || [{
            name: 'pencil',
            svg: `<path transform="matrix(1 0 0 1 -1.1429899599803504 -3.1605504991005917)" width="24.755025125628183" height="22.27515419409526"stroke-width="2.27" stroke-miterlimit="3" stroke="#000000" fill="#FFFFFF" fill-opacity="0" d="M4.475908583320649,27.105502258768677 C5.1142975119825245,27.105502258768677 6.127865933404152,27.20814121500828 6.776375564692156,27.00548195523078 C11.441711844491508,25.54756436779348 13.4353572861924,19.971626678598955 14.427928785340871,15.753197807217953 C14.810751559766345,14.126201015909672 15.334914440374824,10.544861162170962 13.227685142886166,9.7019694431755 C12.347621405994918,9.349943948419 10.053224146113301,13.569575002806502 9.726974519059961,14.20288310238063 C7.617380861671034,18.2979766726062 5.565891590317825,26.81034487632768 11.177268920359392,29.105908329526507 C16.17674704110343,31.1511493789218 19.15578459400323,25.151566268985405 21.02926881884172,21.654395715953573 C21.37145319775192,21.01565154198785 23.45318017123551,17.661391596932695 22.079482005989576,17.20349220851739 C20.912690668263643,16.81456176260874 19.75585672564899,19.068695557492752 19.378933810466503,19.754009948733625 C18.886282863944835,20.64973894240939 18.334318930164443,21.431961881494573 18.078669864473916,22.454558144256705 C17.60650493788415,24.34321785061576 17.48108215837998,28.488111290008582 19.378933810466503,29.656019998984913 C21.84850113652687,31.175753738098987 23.68436567886821,29.46505678115178 25.230121567433166,27.555593624689184 C25.967896335784395,26.644224793196486 26.786162184214206,25.854922095461195 27.330547941728888,24.805035277397163 C27.839325577131554,23.823821266263447 28.231411220238904,22.055157476774124 27.380558093497832,21.204304350033055 C26.869307143824727,20.693053400359958 25.056478831520785,23.142884808842574 24.930060656819492,23.404751027866673 C23.945345276097115,25.44451860222017 23.23780048826957,29.372343386160214 24.930060656819492,31.306355007360125 C25.84545957508319,32.35252519966149 29.230933708948832,32.143951031071694 29.230933708948832,30.956283944977503 "></path>`,
        },
        {
            name: 'rectangle',
            svg: '<path transform="matrix(1 0 0 1 8.72801507537691 8.76086707300766)" width="17.543969849246206" height="17.566205552477165" stroke-width="2" stroke-miterlimit="3" stroke="#000000" fill="#FFFFFF" fill-opacity="0" d="M3.552713678800501e-15,0 L17.54396984924621,0 L17.54396984924621,17.566205552477165 L3.552713678800501e-15 17.566205552477165 L3.552713678800501e-15,0 Z "></path>',
        },
        {
            name: 'triangle',
            svg: '<path transform="matrix(1 0 0 1 2.9895554003199116 2.997048020370889)" width="16.305321450300923" height="16.268844221105578" stroke-width="2" stroke-miterlimit="3" stroke="#000000" fill="#FFFFFF" fill-opacity="0" d="M14.536175834328679,6.456469567568807 L6.401753723775871,22.688836559479086 L22.707075174076785,22.725313788674384 L14.536175834328679,6.456469567568807 L6.40175372377586,22.688836559479086 "></path>',
        },
        {
            name: 'circle',
            svg: '<path transform="matrix(1 0 0 1 8.508165829145721 7.9919908104755155)" width="18.2035175879397" height="18.180591243370515"  stroke-width="2" stroke-miterlimit="3" stroke="#000000" fill="#FFFFFF" fill-opacity="0" d="M3.552713678800501e-15,9.090295621685257 C3.552713678800501e-15,4.069863522321938 4.074995758793975,-1.7763568394002505e-15 9.101758793969857,-1.7763568394002505e-15 C14.128521829145726,-1.7763568394002505e-15 18.203517587939704,4.069863522321938 18.203517587939704,9.090295621685257 C18.203517587939704,14.11072772104858 14.128521829145726,18.180591243370515 9.101758793969857,18.180591243370515 C4.074995758793975,18.180591243370515 3.552713678800501e-15,14.11072772104858 3.552713678800501e-15,9.090295621685257 Z "></path>',
        },
        {
            name: 'line',
            svg: '<path transform="matrix(1 0 0 1 7.123115577889445 28.800251256281406)" width="20.53391959798995" height="22.248743718592962" stroke-width="2.6" stroke-miterlimit="3" stroke="#000000" fill="#FFFFFF" d="M0,0 L20.53391959798995,-22.248743718592962 "></path>',
        },
        {
            name: 'clear',
            svg: '<path transform="matrix(1 0 0 1 7.804648241206021 7.826633165829099)" width="19.390703517587994" height="19.390703517587994" stroke-width="2.8314606741573147" stroke-miterlimit="3" stroke="#000000" fill="#FFFFFF" fill-opacity="0" d="M0,0 L19.390703517587994,19.390703517587994 "></path> <path transform="matrix(1 0 0 1 7.804648241205999 27.19779452819656)" width="19.34673366834173" height="19.395589056393117" stroke-width="2.8115015974440887" stroke-miterlimit="3" stroke="#000000" fill="#FFFFFF" d="M-3.552713678800501e-15,-3.552713678800501e-15 L19.346733668341727,-19.39558905639312 "></path>',
        }];
        return this;
    }
}

ToolsManager.initControls();