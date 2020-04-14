class CreateRiddles < ActiveRecord::Migration[6.0]
  def change
    create_table :riddles do |t|
      t.text :content
      t.text :answer
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
