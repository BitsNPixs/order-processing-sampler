
// Modal template
var modalTemplate = '<div class="modal-dialog modal-lg" role="document">\n' +
    '  <div class="modal-content">\n' +
    '    <div class="modal-header align-items-center">\n' +
    '      <h6 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h6>\n' +
    '      <div class="kv-zoom-actions btn-group">{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '      <div class="floating-buttons btn-group"></div>\n' +
    '      <div class="kv-zoom-body file-zoom-content"></div>\n' + '{prev} {next}\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n';

// Buttons inside zoom modal
var previewZoomButtonClasses = {
    toggleheader: 'btn btn-light btn-icon btn-header-toggle btn-sm',
    fullscreen: 'btn btn-light btn-icon btn-sm',
    borderless: 'btn btn-light btn-icon btn-sm',
    close: 'btn btn-light btn-icon btn-sm'
};

// Icons inside zoom modal classes
var previewZoomButtonIcons = {
    prev: '<i class="icon-arrow-left32"></i>',
    next: '<i class="icon-arrow-right32"></i>',
    toggleheader: '<i class="icon-menu-open"></i>',
    fullscreen: '<i class="icon-screen-full"></i>',
    borderless: '<i class="icon-alignment-unalign"></i>',
    close: '<i class="icon-cross2 font-size-base"></i>'
};

// File actions
var fileActionSettings = {
    removeIcon: '<i class="icon-bin"></i>',
    removeClass: '',
    // uploadIcon: '<i class="icon-upload"></i>',
    // uploadClass: '',
    zoomIcon: '<i class="icon-zoomin3"></i>',
    zoomClass: '',
    indicatorNew: '<i class="icon-file-plus text-success"></i>',
    indicatorSuccess: '<i class="icon-checkmark3 file-icon-large text-success"></i>',
    indicatorError: '<i class="icon-cross2 text-danger"></i>',
    indicatorLoading: '<i class="icon-spinner2 spinner text-muted"></i>',
};


var uploadEl = $('.file-input')
var uploader = uploadEl.fileinput({
            ajaxSettings: {
	            headers: {
			        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			    }
			},
			ajaxDeleteSettings:{
				headers: {
			        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			    }
			},
            uploadUrl: uploadEl.attr('data-upload-url'),
            uploadExtraData: { orderKey: uploadEl.attr('data-order-key') },
            browseOnZoneClick: true,
            uploadAsync: true,
            autoOrientImage: false,
            layoutTemplates: {
                icon: '<i class="icon-file-check"></i>',
                modal: modalTemplate
            },
            initialCaption: "No file selected",
            previewZoomButtonClasses: previewZoomButtonClasses,
            previewZoomButtonIcons: previewZoomButtonIcons,
            fileActionSettings: fileActionSettings,
            overwriteInitial: false,
            initialPreviewAsData: false
        }).on("filebatchselected", function(event, files) {
			uploadEl.fileinput("upload");
		}).on('fileuploaded', function(event, data) {
			let response = data.response;
			$('#start-order-form').append('<input type="hidden" name="files[]" value="' + response.key + '" id="' + response.key + '">');
		}).on('filepredelete', function() {
	        return aborted = !window.confirm('Are you sure you want to delete this file?');
	    }).on('filedeleted', function(event, item) {
	    	$('#' + item).delete();
	        // console.log(uploader.data('fileinput').initialPreviewConfig);
	    });

