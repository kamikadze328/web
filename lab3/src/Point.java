public class Point{

    private double x;
    private double y;
    private int r;
    private boolean answer;

    public Point(){}
    public Point(double x, double y, int r, boolean answer){
        this.x = x;
        this.y = y;
        this.r = r;
        this.answer = answer;
    }

    public double getX() {
        return x;
    }
    public double getY() {
        return y;
    }
    public int getR() {
        return r;
    }
    public boolean isAnswer(){
        return answer;
    }

    public void setX(double x) {
        this.x = x;
    }
    public void setY(double y) {
        this.y = y;
    }
    public void setR(int r) {
        this.r = r;
    }
    public void setAnswer(boolean answer) {
        this.answer = answer;
    }
}
