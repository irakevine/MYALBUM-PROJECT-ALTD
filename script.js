// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let collection_image = ""
const imgInput = document.getElementById('image-control');
imgInput.addEventListener('change', (event) => {
  const image = event.target.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(image);
  reader.addEventListener('load', () => {
    //    console.log(reader.result);
    collection_image = reader.result
  });

});
const collection_form = document.getElementById('form-collection-here');
function create_collection() {
  //e.preventDefault()
  let name = document.getElementById("name-control").value
  let image = collection_image
  if (!localStorage.getItem('collections')) {
    const collections = []
    collections.push({
      name, image
    })
    localStorage.setItem('collections', JSON.stringify(collections))

  }
  const collections = JSON.parse(localStorage.getItem('collections'));

  collections.push({
    name, image
  })
  localStorage.setItem('collections', JSON.stringify(collections))
  location.href = '/'
}


const getCollections = () => {
  const collections = localStorage.getItem('collections');
  if (collections === null || collections.length === 0) {
    localStorage.setItem('collections', [])
    return []
  }
  return JSON.parse(localStorage.getItem('collections'))
}
const displayCollections = () => {


  let collectionsDiv = document.querySelector('#collections')

  const collections = getCollections()
  collections.forEach(collection => {

    let collectionCardDiv = document.createElement('div')
    collectionCardDiv.className = 'card'

    let collectionImg = document.createElement('img')
    collectionImg.className = 'cardImg'
    collectionImg.src = collection.image || "https://via.placeholder.com/150"
    collectionCardDiv.appendChild(collectionImg)
    let collectionConatinerDiv = document.createElement('div')
    collectionConatinerDiv.className = 'container'
    let collectionNameH1 = document.createElement('h3')
    collectionNameH1.innerHTML = collection.name
    collectionConatinerDiv.appendChild(collectionNameH1)
    collectionCardDiv.appendChild(collectionConatinerDiv)
    collectionsDiv.appendChild(collectionCardDiv)
  });

}

displayCollections()