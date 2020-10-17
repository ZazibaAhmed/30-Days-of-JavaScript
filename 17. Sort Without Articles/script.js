const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 
'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 
'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// const array=bands.map( (band ,index) =>  {
// 	const name=band.split(' ');
// 	if( name[0].toLowerCase()==="the" || name[0].toLowerCase()==="a" || name[0].toLowerCase()==="an"){
// 		// return name.slice(1).toString();
// 		return (name.slice(1).toString(),index);
// 	}
// 	else{
// 		return band;
// 	}	
// });

function strip(bandName){
	return bandName.replace(/^(a |the |an )/i, '').trim();
}


const sortedBands=bands.sort( ( a , b) =>  strip(a) > strip(b) ? 1 : -1 );

document.querySelector('#bands').innerHTML=
	sortedBands.map( band => `<li>${band}</li>`)
	.join('');

console.log(sortedBands);