import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.css"],
})
export class OrderSummaryComponent implements OnInit {
  heading: string = "Review Order";
  link: string = "order-placement";
  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    //history.pushState(null, null, window.location.href);
    //history.back();
    //window.onpopstate = () => history.forward();
    let pan = sessionStorage.getItem('gjhfHunj#n&fdgh'); //'DDJPS6803R' //
    if (pan != null && pan != undefined && pan != '') {

    }
    else {
      this.router.navigate(['/'], { relativeTo: this.route });
    }

    $(document).keyup(function(e) {
      if(e.keyCode==13){
          if(!$(e.target).closest('.modal fade in').length) {
              $('.modal').each(function(){
                $('.modal').modal('hide');
             });
          }
      }
    });
  }
}
