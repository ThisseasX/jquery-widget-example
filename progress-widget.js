(function ($) {
    $.widget('thiss.progress', {

        options: {
            progress: 0
        },

        _create: function () {

            // Outer Div
            this.outer = $('<div>')
                .attr('id', 'outer')
                .appendTo(this.element)

            // Inner Div
            this.inner = $('<div>')
                .attr('id', 'inner')
                .appendTo(this.outer);

            // Progress Text
            this.progressSpan = $('<span>')
                .attr('id', 'progress-span')
                .text(this.options.progress + '%')
                .appendTo(this.inner);

            // Button Container
            this.buttonContainer = $('<div>')
                .attr('id', 'button-container')
                .appendTo(this.element);

            var buttonClass = 'ui-button ui-corner-all ui-widget';

            // Buttons
            this.incrementButton = $('<button>')
                .addClass(buttonClass)
                .attr('id', 'inc')
                .text('Increment')
                .button()
                .appendTo(this.buttonContainer);

            this.completeButton = $('<button>')
                .addClass(buttonClass)
                .attr('id', 'complete')
                .text('Complete')
                .button()
                .appendTo(this.buttonContainer);

            this.completeButton = $('<button>')
                .addClass(buttonClass)
                .attr('id', 'clear')
                .text('Clear')
                .button()
                .appendTo(this.buttonContainer);

            this._attachEvents();
            this._render();
        },

        // Utility Methods ////////////////////////////////////////////
        _render: function () {
            this.inner.css('width', this.options.progress + '%');
            this.progressSpan.text(this.options.progress + '%');
        },

        _attachEvents: function () {
            this._on({
                "click #inc": function () {
                    this._increment();
                },
                "click #complete": function () {
                    this._complete();
                },
                "click #clear": function () {
                    this._clear();
                },
            })
        },

        _setProgress: function (i) {
            this.options.progress = Math.min(100, Math.max(0, i));
        },

        // Private Methods ////////////////////////////////////////////
        _increment: function (num = 10) {
            if (this.options.progress >= 100)
                return;

            this._setProgress(this.options.progress + num);
            this._render();
            this._trigger('increment', null, this.options.progress);

            if (this.options.progress >= 100) {
                this._trigger('complete');
            }
        },

        _clear: function () {
            this._setProgress(0);
            this._render();
            this._trigger('clear');
        },

        _complete: function () {
            this._setProgress(100);
            this._render();
            this._trigger('complete');
        },

        // Public Methods /////////////////////////////////////////////
        increment: function (num) {
            this._increment(num);
        },

        complete: function () {
            this._complete();
        }
    });
})(jQuery);