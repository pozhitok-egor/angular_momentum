import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  @ViewChild('quotes') quotes: ElementRef<HTMLDivElement> | undefined;
  quote = {
    author: '',
    text: ''
  }

  constructor(private renderer: Renderer2) {}

  changeQuote() {
    this.quotes?.nativeElement.classList.add('loading');
    const loadingTransition = new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 500);
    });
    const fetchQuotes = fetch('https://favqs.com/api/qotd').then(res => res.json());
    Promise.all([loadingTransition, fetchQuotes]).then(values => values[1]).then(res => res.quote).then(quote => {
      this.quote = {
        author: quote.author,
        text: quote.body
      }
      this.quotes?.nativeElement.classList.remove('loading')
    })
  }

  ngOnInit(): void {
    this.changeQuote();
  }
}
