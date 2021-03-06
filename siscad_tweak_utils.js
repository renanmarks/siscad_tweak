function downloadFile(filename, url) {
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
function makeCSVFile(txt) {
  var data = new Blob([txt], {
    type: 'text/csv'
  });
  // returns a URL you can use as a href
  return window.URL.createObjectURL(data);
}
function getValue(x) {
  var posabre = x.indexOf('(');
  var pospercent = x.indexOf('%');
  var percent = x.substring(posabre + 1, pospercent);
  return parseFloat(percent.replace(',', '.'));
}
function percent(value, total) {
  return Math.round(value * 100 / total);
}
function getData(line, pos) {
  return line.find('td').eq(pos).text().trim();
}
function isFailed(value) {
  return value > 25;
}
function isWarning(value) {
  return value > 19;
}
function appendLogo(){
	$('.logoApplication').append('<div id=\'twk\' style=\'top:50;left:230;position:absolute;background-color:red;font-size:large;color:black\'><b>TWEAKED!</b></div>');
}
function highlightLinks(line) {
  var fhighon = function () {
    $(this).contents('td').css({
      'border': '1px solid black',
      'border-left': 'none',
      'border-right': 'none',
      'font-weight': 'Bold'
    });
    var a = line.find('a');
    //make line bold on hover
    a.each(function (index) {
      $(this).css('font-weight', 'Bold');
    });
  };
  var fhighoff = function () {
    $(this).contents('td').css({
      'border': 'none',
      'border-left': 'none',
      'border-right': 'none',
      'font-weight': ''
    });
    var a = line.find('a');
    //make line bold on hover
    a.each(function (index) {
      $(this).css('font-weight', '');
    });
  };
  line.hover(fhighon, fhighoff);
}
function appendSummaryTable(warning, failed, total){
  var active = total - failed - warning;
  var activep = percent(active, total);
  var warningp = percent(warning, total);
  var failedp = percent(failed, total);
  $('.caixaAzul').last().after('<table style="border-collapse:collapse;border-spacing:0;margin-left:auto;margin-right: auto;"><tr><td style="font-weight:bold;border-style:solid;border-width:1px;padding:5px;text-align:center;">Situação<br></td><td style="font-weight:bold;border-style:solid;border-width:1px;padding:5px;text-align:center;">Quantidade (%)<br></td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;background-color:#ff7d66;color:#ffffff;">Reprovados por falta</td><td style="border-style:solid;border-width:1px;padding:5px;background-color:#ff7d66;color:#ffffff;text-align:center;">' + failed + ' (' + failedp + '%)' + '</td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;background-color:khaki;">Atenção</td><td style="border-style:solid;border-width:1px;padding:5px;background-color:khaki;text-align:center;">' + warning + ' (' + warningp + '%)' + '</td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;background-color:#9aff99;">Ativos<br></td><td style="border-style:solid;border-width:1px;padding:5px;background-color:#9aff99;text-align:center;">' + active + ' (' + activep + '%) / ativos + atenção = '+ (active+warning) + '</td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;font-weight:bold;">Total</td><td style="border-style:solid;border-width:1px;padding:5px;text-align:center;font-weight:bold;">' + total + '</td></tr></table>');
}

function copyToClipboard(text) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
}