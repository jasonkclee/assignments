void settings() {
  size(500, 500);
}
ArrayList<Integer>coords = new ArrayList<Integer>();


void setup() {
  ellipseMode(CENTER);
  textAlign(CENTER);
}

void draw() {
  background(255);
  if (coords.size()>0) {
    for (int i = 0; i < coords.size(); i+=2) {
      float x = coords.get(i);
      float y = coords.get(i+1);
      fill(255);
      ellipse(x, y, 100, 100);
    }
  }
  fill(0);
  text("Number of clicks : " + coords.size()/2, width/2, height/2);
}

void mouseClicked() {
  coords.add(mouseX);
  coords.add(mouseY);
}